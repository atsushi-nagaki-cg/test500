type Props = {
  text: string
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default function Index({ text }: Props) {
  return (
    <>
      <h1>Test Error</h1>
      <p>{text}</p>
    </>
  )
}

export const getServerSideProps = () => {
  throw new Error("Throwing an error from getServerSideProps")
}
