export default function SignalIcon({ name }) {
  if (name === "document") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 3h8l4 4v14H7V3Z" />
        <path d="M15 3v5h4M10 12h6M10 16h6M10 8h2" />
      </svg>
    );
  }

  if (name === "check") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 6 9 17l-5-5" />
        <path d="M21 12a9 9 0 1 1-5.3-8.2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 5 6v5c0 4.5 3 8.7 7 10 4-1.3 7-5.5 7-10V6l-7-3Z" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </svg>
  );
}
