import Markdown from "react-markdown";
import { Avatar, Link } from "@nextui-org/react";

import AccountLayout from "../../AccountLayout";
import UserActions from "./UserActions";

async function getUser(params) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/user/${params.userId}`,
    { cache: "no-store" }
  );
  const { data } = await res.json();

  return data || {};
}

async function UserBioPage({ params }) {
  const user = await getUser(params);

  const clubsWhereAdminIds = new Set();
  user.clubsWhereAdmin.forEach(({ id }) => clubsWhereAdminIds.add(id));

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[600px] flex flex-col space-y-4 pb-4">
        <h1 className="text-4xl font-bold pb-4 flex">
          <Avatar showFallback name={user.name} src={user.gravatar} />
          <div className="pl-2">{user.name || "Anonymous user"}</div>
        </h1>
        {user.clubsWhereAdmin.length ? (
          <div>
            <p>Organizer of:</p>
            <ul>
              {user.clubsWhereAdmin.map(({ name, slug }, id) => (
                <li key={id}>
                  <Link href={`/events/${slug}`}>{name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <></>
        )}
        <Markdown>{user.bio || "_No bio provided yet._"}</Markdown>
        <UserActions user={user} userId={params.userId} />
      </div>
    </div>
  );
}

export default function userBioPage({ params }) {
  return (
    <AccountLayout>
      <UserBioPage params={params} />
    </AccountLayout>
  );
}
