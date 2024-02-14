import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next"

export default function withGSSPTimeout<T extends { [key: string]: any }>(
  fn: GetServerSideProps<T>,
  duration: number
): GetServerSideProps<T> {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<T>> => {
    const id = setTimeout(() => {
      throw new Error("getServerSideProps timed out")
    }, duration)
    try {
      const result = await fn(context)
      clearTimeout(id)
      return result
    } catch (error) {
      throw new Error("getServerSideProps exception")
    }
  }
}
