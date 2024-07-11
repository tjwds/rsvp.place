import AccountLayout from "@/app/AccountLayout";
import PageBreadcrumbs from "../PageBreadcrumbs";

function PostPage({ params }) {
  const title = "Terms of Service & Privacy Policy";

  return (
    <>
      <PageBreadcrumbs title={title} />
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[600px] flex flex-col space-y-4 pb-4">
          <h1 className="text-3xl font-bold ">{title}</h1>
          <h2 className="text-xl font-bold ">1. Terms</h2>

          <p>
            By accessing this Website, accessible from rsvp.place, you are
            agreeing to be bound by these Website Terms and Conditions of Use
            and agree that you are responsible for the agreement with any
            applicable local laws. If you disagree with any of these terms, you
            are prohibited from accessing this site. The materials contained in
            this Website are protected by copyright and trade mark law.
          </p>

          <h2 className="text-xl font-bold ">2. Use License</h2>

          <p>
            Permission is granted to temporarily download one copy of the
            materials on rsvp.place&rsquo;s Website for personal, non-commercial
            transitory viewing only. This is the grant of a license, not a
            transfer of title, and under this license you may not:
          </p>

          <ul className="list-disc ml-4">
            <li>modify or copy the materials;</li>
            <li>
              use the materials for any commercial purpose or for any public
              display;
            </li>
            <li>
              attempt to reverse engineer any software contained on
              rsvp.place&rsquo;s Website;
            </li>
            <li>
              remove any copyright or other proprietary notations from the
              materials; or
            </li>
            <li>
              transferring the materials to another person or
              &ldquo;mirror&rdquo; the materials on any other server.
            </li>
          </ul>

          <p>
            This will let rsvp.place to terminate upon violations of any of
            these restrictions. Upon termination, your viewing right will also
            be terminated and you should destroy any downloaded materials in
            your possession whether it is printed or electronic format.
          </p>

          <h2 className="text-xl font-bold ">3. Disclaimer</h2>

          <p>
            All the materials on rsvp.place&rsquo;s Website are provided
            &ldquo;as is&rdquo;. rsvp.place makes no warranties, may it be
            expressed or implied, therefore negates all other warranties.
            Furthermore, rsvp.place does not make any representations concerning
            the accuracy or reliability of the use of the materials on its
            Website or otherwise relating to such materials or any sites linked
            to this Website.
          </p>

          <h2 className="text-xl font-bold ">4. Limitations</h2>

          <p>
            rsvp.place or its suppliers will not be hold accountable for any
            damages that will arise with the use or inability to use the
            materials on rsvp.place&rsquo;s Website, even if rsvp.place or an
            authorize representative of this Website has been notified, orally
            or written, of the possibility of such damage. Some jurisdiction
            does not allow limitations on implied warranties or limitations of
            liability for incidental damages, these limitations may not apply to
            you.
          </p>

          <h2 className="text-xl font-bold ">5. Revisions and Errata</h2>

          <p>
            The materials appearing on rsvp.place&rsquo;s Website may include
            technical, typographical, or photographic errors. rsvp.place will
            not promise that any of the materials in this Website are accurate,
            complete, or current. rsvp.place may change the materials contained
            on its Website at any time without notice. rsvp.place does not make
            any commitment to update the materials.
          </p>

          <h2 className="text-xl font-bold ">6. Links</h2>

          <p>
            rsvp.place has not reviewed all of the sites linked to its Website
            and is not responsible for the contents of any such linked site. The
            presence of any link does not imply endorsement by rsvp.place of the
            site. The use of any linked website is at the user&rsquo;s own risk.
          </p>

          <h2 className="text-xl font-bold ">
            7. Site Terms of Use Modifications
          </h2>

          <p>
            rsvp.place may revise these Terms of Use for its Website at any time
            without prior notice. By using this Website, you are agreeing to be
            bound by the current version of these Terms and Conditions of Use.
          </p>

          <h2 className="text-xl font-bold ">8. Your Privacy</h2>

          <p>
            At rsvp.place, accessible from rsvp.place, one of our main
            priorities is the privacy of our visitors. This Privacy Policy
            document contains types of information that is collected and
            recorded by rsvp.place and how we use it.
          </p>

          <p>
            If you have additional questions or require more information about
            our Privacy Policy, do not hesitate to contact us.
          </p>

          <h3 className="text-lg font-bold ">
            General Data Protection Regulation (GDPR)
          </h3>
          <p>We are a Data Controller of your information.</p>

          <p>
            rsvp.place legal basis for collecting and using the personal
            information described in this Privacy Policy depends on the Personal
            Information we collect and the specific context in which we collect
            the information:
          </p>
          <ul className="list-disc ml-4">
            <li>rsvp.place needs to perform a contract with you</li>
            <li>You have given rsvp.place permission to do so</li>
            <li>
              Processing your personal information is in rsvp.place legitimate
              interests
            </li>
            <li>rsvp.place needs to comply with the law</li>
          </ul>

          <p>
            rsvp.place will retain your personal information only for as long as
            is necessary for the purposes set out in this Privacy Policy. We
            will retain and use your information to the extent necessary to
            comply with our legal obligations, resolve disputes, and enforce our
            policies.
          </p>

          <p>
            If you are a resident of the European Economic Area (EEA), you have
            certain data protection rights. If you wish to be informed what
            Personal Information we hold about you and if you want it to be
            removed from our systems, please contact us.
          </p>

          <p>
            In certain circumstances, you have the following data protection
            rights:
          </p>
          <ul className="list-disc ml-4">
            <li>
              The right to access, update or to delete the information we have
              on you.
            </li>
            <li>The right of rectification.</li>
            <li>The right to object.</li>
            <li>The right of restriction.</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent</li>
          </ul>

          <h3 className="text-lg font-bold ">Log Files</h3>

          <p>
            rsvp.place follows a standard procedure of using log files. These
            files log visitors when they visit websites. All hosting companies
            do this and a part of hosting services&rsquo; analytics. The
            information collected by log files include internet protocol (IP)
            addresses, browser type, Internet Service Provider (ISP), date and
            time stamp, referring/exit pages, and possibly the number of clicks.
            These are not linked to any information that is personally
            identifiable. The purpose of the information is for analyzing
            trends, administering the site, tracking users&rsquo; movement on
            the website, and gathering demographic information.
          </p>

          <h3 className="text-lg font-bold ">Privacy Policies</h3>

          <p>
            You may consult this list to find the Privacy Policy for each of the
            advertising partners of rsvp.place.
          </p>

          <p>
            Third-party ad servers or ad networks uses technologies like
            cookies, JavaScript, or Web Beacons that are used in their
            respective advertisements and links that appear on rsvp.place, which
            are sent directly to users&rsquo; browser. They automatically
            receive your IP address when this occurs. These technologies are
            used to measure the effectiveness of their advertising campaigns
            and/or to personalize the advertising content that you see on
            websites that you visit.
          </p>

          <p>
            Note that rsvp.place has no access to or control over these cookies
            that are used by third-party advertisers.
          </p>

          <h3 className="text-lg font-bold ">Third Party Privacy Policies</h3>

          <p>
            rsvp.place&rsquo;s Privacy Policy does not apply to other
            advertisers or websites. Thus, we are advising you to consult the
            respective Privacy Policies of these third-party ad servers for more
            detailed information. It may include their practices and
            instructions about how to opt-out of certain options.
          </p>

          <p>
            You can choose to disable cookies through your individual browser
            options. To know more detailed information about cookie management
            with specific web browsers, it can be found at the browsers&rsquo;
            respective websites.
          </p>

          <h3 className="text-lg font-bold ">Children&rsquo;s Information</h3>

          <p>
            Another part of our priority is adding protection for children while
            using the internet. We encourage parents and guardians to observe,
            participate in, and/or monitor and guide their online activity.
          </p>

          <p>
            rsvp.place does not knowingly collect any Personal Identifiable
            Information from children under the age of 13. If you think that
            your child provided this kind of information on our website, we
            strongly encourage you to contact us immediately and we will do our
            best efforts to promptly remove such information from our records.
          </p>

          <h3 className="text-lg font-bold ">Online Privacy Policy Only</h3>

          <p>
            Our Privacy Policy applies only to our online activities and is
            valid for visitors to our website with regards to the information
            that they shared and/or collect in rsvp.place. This policy is not
            applicable to any information collected offline or via channels
            other than this website.
          </p>

          <h3 className="text-lg font-bold ">Consent</h3>

          <p>
            By using our website, you hereby consent to our Privacy Policy and
            agree to its terms.
          </p>

          <h2 className="text-xl font-bold ">9. Governing Law</h2>

          <p>
            Any claim related to rsvp.place&rsquo;s Website shall be governed by
            the laws of us without regards to its conflict of law provisions.
          </p>
          <h2 className="text-xl font-bold ">Contact us</h2>
          <p>
            Joseph Woods
            <br />
            1500 Chestnut St. Suite 2 #1363
            <br />
            Philadelphia, PA 19102
          </p>
          <p>
            Generated with 
            <a href="https://www.termsofservicegenerator.net">
              https://www.termsofservicegenerator.net
            </a>
            .
          </p>
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
