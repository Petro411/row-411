import baseApi, { endpoints } from "@/services/api";
import { GetServerSideProps } from "next";
import { destroyCookie } from "nookies";

const withAuth: GetServerSideProps = async (context) => {
    try {
        const token = context?.req?.cookies?.token ?? "";

        if (!token) {
            throw new Error("unauthorized.");
        }

        const res = await baseApi.get(endpoints.lookup, { headers: { "Authorization": token.toString() } });

        let user = res.data?.user;

        if (!user) {
            throw new Error("unauthorized.");
        }

        if (user.isDeleted || user.isSuspended) {
            throw new Error("unauthorized.");
        }

        if (!user.isOnboarded) {
            if (context.resolvedUrl.includes("/subscription")) {
                return {
                    props: {

                    }
                }
            } else {
                return {
                    redirect: {
                        destination: "/subscription",
                        permanent: false,
                    },
                };
            }

        }

        if (context.resolvedUrl === "/subscription") {
            return {
                redirect: {
                    destination: "/dashboard",
                    permanent: false,
                },
            };
        }


        return {
            props: {

            }
        }

    } catch (error) {
        destroyCookie(context, "token");
        return {
            redirect: {
                destination: "/auth/login",
                permanent: false,
            },
        };
    }
};

export default withAuth;