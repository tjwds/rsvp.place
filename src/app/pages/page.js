import AccountLayout from "@/app/AccountLayout";
import { Link } from "@nextui-org/react";

function PostPage({ params }) {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[600px] flex flex-col space-y-4 pb-4">
        <h1 className="text-4xl font-bold pb-4">Posts</h1>
        <div>
          <ul>
            <li>
              <Link href="/pages/manifesto">Manifesto</Link>
            </li>
            <li>
              <Link href="/pages/terms">Terms of Service & Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function postsPage({ params }) {
  return (
    <AccountLayout>
      <PostPage params={params} />
    </AccountLayout>
  );
}
