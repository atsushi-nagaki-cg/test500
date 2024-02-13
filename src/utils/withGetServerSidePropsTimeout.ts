import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next"

export default function withGetServerSidePropsTimeout<
  P extends { [key: string]: any }
>(
  getServerSidePropsFunc: GetServerSideProps<P>,
  timeout: number
): GetServerSideProps<P> {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const timeoutPromise = new Promise<GetServerSidePropsResult<P>>(
      (_, reject) => {
        setTimeout(
          () => reject(new Error("getServerSideProps timed out")),
          timeout
        )
      }
    )

    try {
      const result = await Promise.race([
        getServerSidePropsFunc(context),
        timeoutPromise,
      ])
      return result
    } catch (error) {
      console.error(error)
      throw new Error("getServerSideProps timed out")
    }
  }
}
