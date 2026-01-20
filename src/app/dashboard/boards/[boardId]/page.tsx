interface BoardDetailsProp {
  params: Promise<{ boardId: string }>;
}

export async function generateMetadata({ params }: BoardDetailsProp) {
  const { boardId } = await params;
  console.log(boardId);
}

export async function generateStaticParam({ params }: BoardDetailsProp) {
  const { boardId } = await params;
  console.log(boardId);
}

export default async function Page({ params }: BoardDetailsProp) {
  const { boardId } = await params;
  console.log(boardId);

  return <div>Page</div>;
}
