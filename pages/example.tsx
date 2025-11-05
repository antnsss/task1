import { prisma } from "@/lib/prisma";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Page({ user }: Props) {
  return (
    <main>
      <h1>Hello, {user?.name || "Guest"}!</h1>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = await prisma.user.findFirst({
    where: {
      email: "admin@example.com",
    },
  });

  return {
    props: {
      user,
    },
  };
};
