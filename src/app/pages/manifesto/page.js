import AccountLayout from "@/app/AccountLayout";
import Markdown from "react-markdown";
import PageBreadcrumbs from "../PageBreadcrumbs";

function PostPage({ params }) {
  const title = "rsvp.place Manifesto";

  return (
    <>
      <PageBreadcrumbs title={title} />
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[600px] flex flex-col space-y-4 pb-4">
          <h1 className="text-4xl font-bold pb-4">{title}</h1>
          <div className="space-y-4">
            <Markdown>
              When I was first starting my career journey as a software
              developer around a decade ago, the internet was a little bit
              different. I constantly found myself surrounded, both IRL and on
              the web, by folks who were more motivated by _time_ than _money_.
              This was great for me, a student with plenty of the former and
              basically none of the latter.
            </Markdown>
            <Markdown>
              The best meetup groups I&rsquo;ve ever been involved with were run
              by passionate, dedicated people; people who were not financially
              motivated, but dedicated their time and yes, sometimes their own
              money, to creating an environment where other people can have fun
              and succeed. I think there&rsquo;s a clear parallel between these
              social clubs for programmers and random websites I stumble across;
              now-a-days, across every function I participate in, it feels like
              it&rsquo;s harder and harder for someone to talk about their
              passions without money coming into the equation.
            </Markdown>
            <Markdown>
              Frankly, I don&rsquo;t have a lot of fun in spaces — physical or
              digital — where everyone&rsquo;s trying to figure out how to make
              a buck. And it feels like those spaces are more and more prevalent
              now, and that spaces where people can just come together without
              having to pay rent for the privilege are few and far between.
            </Markdown>
            <Markdown>
              **It doesn&rsquo;t have to be this way.** There are plenty of
              folks out there making a positive impact in the world without
              profit being their first priority. rsvp.place is a space for those
              people.
            </Markdown>
            <Markdown>
              I want this site to be in a peer group of organizations with the
              following principles:
            </Markdown>
            <ul className="list-disc ml-4">
              <li>Promote an equitable world</li>
              <li>Actively stand up to discrimination</li>
              <li>Sequester any conversations about money</li>
              <li>Spend frugally</li>
              <li>Act with transparency</li>
            </ul>
            <Markdown>
              This site is only in its first iteration, but I hope you&rsquo;ll
              stay tuned as it turns into something that reflects the ethos of
              the spaces I want to help foster.
            </Markdown>
            <p>—Joe</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function postsPage({ params }) {
  return (
    <AccountLayout>
      <PostPage params={params} />
    </AccountLayout>
  );
}
