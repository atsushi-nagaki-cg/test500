import withGetServerSidePropsTimeout from "@/utils/withGetServerSidePropsTimeout"

type Props = {
  text: string
}

export default function Index({ text }: Props) {
  return (
    <>
      <h1>Test No Timeout</h1>
      <p>{text}</p>
    </>
  )
}

export const getServerSideProps = withGetServerSidePropsTimeout(async () => {
  return {
    props: { text: "Hello World!" },
  }
}, 2000)
