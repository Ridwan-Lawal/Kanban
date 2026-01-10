export default function Divider() {
  return (
    <div className="flex items-center gap-4 py-4">
      <div className="bg-lines-light dark:bg-lines-dark h-px flex-1" />
      <span className="body-l text-medium-grey shrink-0">or</span>
      <div className="bg-lines-light dark:bg-lines-dark h-px flex-1" />
    </div>
  );
}
