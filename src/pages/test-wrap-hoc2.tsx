import withGSSPTimeout from "@/utils/withGSSPTimeout"

type Props = {
  text: string
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default function Index({ text }: Props) {
  return (
    <>
      <h1>Test Wrap HOC</h1>
      <p>{text}</p>
    </>
  )
}

export const getServerSideProps = withGSSPTimeout(async () => {
  await sleep(6000)
  return {
    props: { text: "Hello World!" },
  }
}, 2000)
