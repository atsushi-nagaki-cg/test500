import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next"

export default function withGetServerSidePropsTimeout<
  T extends { [key: string]: any }
>(fn: GetServerSideProps<T>, duration: number) {
  return async (context: GetServerSidePropsContext) => {
    const timeoutPromise = new Promise<GetServerSidePropsResult<T>>(
      (_, reject) => {
        setTimeout(
          () => reject(new Error("getServerSideProps timed out")),
          duration
        )
      }
    )

    try {
      return await Promise.race([fn(context), timeoutPromise])
    } catch (error) {
      throw new Error("getServerSideProps exception")
    }
  }
}
