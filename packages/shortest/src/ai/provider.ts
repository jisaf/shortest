import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { LanguageModelV1 } from "ai";
import { AIConfig } from "@/types";
import { AIError } from "@/utils/errors";

/**
 * Creates a custom AI provider based on the provided configuration.
 *
 * @private
 */
export const createProvider = (aiConfig: AIConfig): LanguageModelV1 => {
  switch (aiConfig.provider) {
    case "anthropic":
      const anthropic = createAnthropic({ apiKey: aiConfig.apiKey });
      return anthropic(aiConfig.model) as LanguageModelV1;
    case "litellm":
      const litellm = createOpenAICompatible({
        baseURL: aiConfig.baseURL,
        apiKey: aiConfig.apiKey,
      });
      return litellm(aiConfig.model) as LanguageModelV1;
    default:
      throw new AIError(
        "unsupported-provider",
        `${(aiConfig as any).provider} is not supported.`,
      );
  }
};
