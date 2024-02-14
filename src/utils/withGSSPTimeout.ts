import { GetServerSideProps, GetServerSidePropsContext } from "next"

export default async function withGSSPTimeout<T extends { [key: string]: any }>(
  fn: GetServerSideProps<T>,
  duration: number
): Promise<GetServerSideProps<T>> {
  return async (context: GetServerSidePropsContext) => {
    const id = setTimeout(() => {
      throw new Error("getServerSideProps timed out")
    }, duration)
    try {
      const result = await fn(context)
      clearTimeout(id)
      return result
    } catch (error) {
      throw new Error("getServerSideProps timed out")
    }
  }
}
