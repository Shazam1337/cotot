import type { Address } from "viem";

export function shortenAddress(address: Address, leading = 6, trailing = 4) {
  return `${address.slice(0, leading)}...${address.slice(-trailing)}`;
}

export function getWalletErrorMessage(error: unknown, action: "connect" | "switch") {
  const message = error instanceof Error ? error.message.toLowerCase() : "";

  if (
    message.includes("user rejected") ||
    message.includes("user denied") ||
    message.includes("request rejected") ||
    message.includes("4001")
  ) {
    return action === "switch"
      ? "Network switch was rejected."
      : "Connection request was rejected.";
  }

  if (
    message.includes("already pending") ||
    message.includes("already processing") ||
    message.includes("request already") ||
    message.includes("-32002")
  ) {
    return "A wallet request is already open.";
  }

  if (
    message.includes("provider not found") ||
    message.includes("connector not connected") ||
    message.includes("not installed")
  ) {
    return "No compatible wallet provider was found.";
  }

  return action === "switch"
    ? "Unable to switch networks. Check your wallet and try again."
    : "Unable to connect. Check your wallet and try again.";
}
