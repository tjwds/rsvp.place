import { Link } from "@nextui-org/react";
import AccountLayout from "./AccountLayout";

export default function App() {
  return (
    <AccountLayout>
      <p>
        rsvp.place is a place for communities to be able to come together.{" "}
        <Link href="/pages/manifesto">Read the manifesto →</Link>
      </p>
      <p>
        This website is in a <em>very</em> early alpha preview. Please expect
        change and sometimes-broken behavior.
      </p>
    </AccountLayout>
  );
}
