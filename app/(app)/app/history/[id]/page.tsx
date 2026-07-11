import { DemoTransactionDetailScreen } from "@/components/sangapay/demo-transaction-detail-screen";

export default async function TransactionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <DemoTransactionDetailScreen id={id} />;
}
