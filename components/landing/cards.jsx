import SignalIcon from "@/components/landing/SignalIcon";

export function SolutionCard({ number, title, text }) {
  return (
    <article>
      <span>{number}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

export function BenefitCard({ title, text }) {
  return (
    <article>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

export function SignalCard({ label, icon }) {
  return (
    <article>
      <SignalIcon name={icon} />
      <span>{label}</span>
    </article>
  );
}
