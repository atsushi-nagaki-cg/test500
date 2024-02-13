import withGetServerSidePropsTimeout from "@/utils/withGetServerSidePropsTimeout"

type Props = {
  text: string
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default function Index({ text }: Props) {
  return (
    <>
      <h1>Test6</h1>
      <p>{text}</p>
    </>
  )
}

export const getServerSideProps = withGetServerSidePropsTimeout(async () => {
  await sleep(6000)
  return {
    props: { text: "Hello World!" },
  }
}, 2000)
