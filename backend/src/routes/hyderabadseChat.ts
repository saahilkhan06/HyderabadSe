import type { FastifyInstance } from "fastify";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatBody = {
  message?: string;
  history?: ChatMessage[];
};

const SYSTEM_PROMPT = `
You are HyderabadSe Assistant, a friendly and helpful AI assistant for HyderabadSe.

HyderabadSe is an India → Gulf product sourcing service.

Your job is to help customers in the Gulf understand HyderabadSe and request products from India.

IMPORTANT ABOUT HYDERABADSE:

- HyderabadSe helps customers in the Gulf get eligible products from India.
- Hyderabad is the starting sourcing location, but HyderabadSe is not limited only to Hyderabad.
- A customer can ask HyderabadSe to source a product specifically for them.
- HyderabadSe is NOT a normal fixed-product store.
- Customers can request products they cannot easily find in the Gulf.
- HyderabadSe checks the product in India, provides a quote, purchases it for the customer after confirmation, and arranges shipping.
- Customers can request many different types of eligible products, including food and packaged snacks, clothing, ethnic wear, fashion accessories, jewellery and gifts, handicrafts, household items, personal-care products, regional products, and other legally shippable products.
- Some products may not be legally eligible for international shipping. Never promise that every product can be shipped.
- Exact availability, price, shipping cost, customs charges, and delivery time must be confirmed through a product request.
- HyderabadSe currently focuses on customers in the Gulf, including Dubai/UAE.

YOUR ROLE:

1. Explain how HyderabadSe works.
2. Help customers understand what they can request.
3. Help customers decide what information to provide in a product request.
4. Answer general questions about sourcing and shipping.
5. Encourage customers to use "Request a Product" when they want an exact quote or availability check.
6. Be friendly, concise, professional, and reassuring.

HOW THE SERVICE WORKS:

1. Customer tells HyderabadSe what they want from India.
2. HyderabadSe checks availability and sourcing possibilities.
3. HyderabadSe provides a quote.
4. Customer confirms the request.
5. HyderabadSe sources and purchases the product.
6. The product is packed and shipped to the customer's Gulf destination.
7. Customer receives the shipment.

IMPORTANT RESTRICTIONS:

- Never invent product prices.
- Never invent shipping prices.
- Never promise that a particular product is available.
- Never promise a specific delivery date unless the user has been given one through the official service.
- Never claim that customs will definitely allow a product.
- Never claim that every Indian product can be shipped internationally.
- If the customer asks about an exact product, brand, quantity, or price, recommend submitting a product request so HyderabadSe can check it.
- If the customer asks something unrelated to HyderabadSe, politely explain that you are focused on helping with HyderabadSe and products from India.
- Do not pretend to be a human employee.
- Do not ask for sensitive information such as passwords, card numbers, OTPs, or banking credentials.

FORMATTING:

- Use **bold** for important information.
- Use short paragraphs.
- Use bullet points when useful.
- Keep answers easy to understand.
- Avoid unnecessary technical language.
- You may use emojis occasionally, but don't overuse them.

IMPORTANT:

When appropriate, guide the customer toward the "Request a Product" form for exact availability, pricing, and shipping information.

If someone asks "Can you get anything from India?", explain that HyderabadSe can help source many eligible products, but international shipping restrictions apply and each request must be checked individually.
`;

const FREE_MODELS = [
  "inclusionai/ling-3.0-flash-sante:free",
  "inclusionai/ling-3.0-flash:free",
];

const OPENROUTER_TIMEOUT_MS = 15000;

async function callOpenRouter(
  model: string,
  messages: Array<{
    role: "system" | "user" | "assistant";
    content: string;
  }>,
) {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, OPENROUTER_TIMEOUT_MS);

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer":
            process.env.APP_URL ||
            "http://localhost:3000",
          "X-Title": "HyderabadSe Assistant",
        },

        body: JSON.stringify({
          model,
          messages,
          max_tokens: 1024,
          temperature: 0.7,
        }),

        signal: controller.signal,
      },
    );

    const data = await response.json();

    return {
      ok: response.ok,
      data,
      status: response.status,
    };
  } catch (error: any) {
    if (error?.name === "AbortError") {
      return {
        ok: false,
        data: {
          error: {
            message: "Request timed out",
          },
        },
        status: 504,
      };
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export default async function hyderabadseChatRoutes(
  fastify: FastifyInstance,
) {
  fastify.post<{ Body: ChatBody }>(
    "/api/hyderabadse/chat",
    async (request, reply) => {
      try {
        const message =
          request.body?.message?.trim() || "";

        const history =
          Array.isArray(request.body?.history)
            ? request.body.history
            : [];

        if (!message) {
          return reply.code(400).send({
            success: false,
            message: "Please enter a message.",
          });
        }

        if (message.length > 2000) {
          return reply.code(400).send({
            success: false,
            message:
              "Please keep your message under 2000 characters.",
          });
        }

        const conversationMessages = history
          .filter(
            (msg) =>
              msg &&
              (msg.role === "user" ||
                msg.role === "assistant") &&
              typeof msg.content === "string",
          )
          .slice(-10)
          .map((msg) => ({
            role: msg.role,
            content: msg.content.slice(0, 2000),
          }));

        conversationMessages.push({
          role: "user" as const,
          content: message,
        });

        const messages = [
          {
            role: "system" as const,
            content: SYSTEM_PROMPT,
          },
          ...conversationMessages,
        ];

        let lastError: string | null = null;

        for (const model of FREE_MODELS) {
          const result = await callOpenRouter(
            model,
            messages,
          );

          if (
            result.ok &&
            result.data?.choices?.[0]?.message?.content
          ) {
            const response =
              result.data.choices[0].message.content;

            fastify.log.info(
              `HyderabadSe chatbot responded using model: ${model}`,
            );

            return reply.send({
              success: true,
              response,
            });
          }

          if (
            result.status === 429 ||
            result.status === 404
          ) {
            lastError =
              result.data?.error?.message ||
              "Model unavailable";

            fastify.log.warn(
              `Model ${model} unavailable (${result.status}), trying next model.`,
            );

            continue;
          }

          fastify.log.error(
            result.data,
            "OpenRouter error",
          );

          return reply.code(500).send({
            success: false,
            message:
              "AI service error. Please try again.",
          });
        }

        fastify.log.error(
          `All HyderabadSe AI models failed. Last error: ${lastError}`,
        );

        return reply.code(429).send({
          success: false,
          message:
            "The AI assistant is busy right now. Please try again in a few seconds.",
        });
      } catch (error) {
        fastify.log.error(
          error,
          "HyderabadSe chatbot error",
        );

        return reply.code(500).send({
          success: false,
          message:
            "Unable to connect to the AI assistant. Please try again.",
        });
      }
    },
  );
}