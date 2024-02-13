type Props = {
  text: string
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default function Index({ text }: Props) {
  return (
    <>
      <h1>Test1</h1>
      <p>{text}</p>
    </>
  )
}

export const getServerSideProps = async () => {
  await sleep(5000)
  return {
    props: { text: "Hello World!" },
  }
}
