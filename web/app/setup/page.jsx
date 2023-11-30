import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import MyProfile from "../(components)/Profile"

const Member = () => {
  // const { data: session } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect("/api/auth/signin?callbackUrl=/setup");
  //   },
  // });

  return (
    <div>
    <MyProfile/>
    </div>
  );
};

export default Member;
