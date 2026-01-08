interface BoardDetailsProp {
  params: Promise<{ boardId: string }>;
}

export async function generateMetadata({ params }: BoardDetailsProp) {
  const { boardId } = await params;
}

export async function generateStaticParams({ params }: BoardDetailsProp) {
  const { boardId } = await params;
}

export default async function Page({ params }: BoardDetailsProp) {
  const { boardId } = await params;

  return <div>Page</div>;
}
