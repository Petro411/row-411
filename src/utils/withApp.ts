import baseApi, { endpoints } from "@/services/api";
import { GetServerSideProps } from "next";

const withApp: GetServerSideProps = async (context) => {
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
            return {
                redirect: {
                    destination: "/subscription",
                    permanent: false,
                },
            };
        }

        return {
            redirect: {
                destination: "/dashboard",
                permanent: false,
            },
        };
    } catch (error) {

        return {
            props: {

            },
        };
    }
};

export default withApp;