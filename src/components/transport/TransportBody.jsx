import TransportItem from "./TransportItem";

export default function TransportBody({ handler }) {
  return (
    <div className="transport-body">
      <TransportItem handler={handler} />
      <TransportItem handler={handler} />
      <TransportItem handler={handler} />
      <TransportItem handler={handler} />
      <TransportItem handler={handler} />
      <TransportItem handler={handler} />
      <TransportItem handler={handler} />
    </div>
  );
}
