import { limiter } from "@/lib/cron/limiter";
import { BusinessConfig as platform } from "@dub/platform-config";
import { prismaEdge } from "@dub/prisma/edge";
import NewSaleCreated from "emails/new-sale-created";
import { sendEmailViaResend } from "emails/send-via-resend";

export async function notifyPartnerSale({
  partner,
  program,
  sale,
}: {
  partner: {
    id: string;
    referralLink: string;
  };
  program: {
    id: string;
    name: string;
    logo: string | null;
  };
  sale: {
    amount: number;
    earnings: number;
  };
}) {
  const partnerUsers = await prismaEdge.partnerUser.findMany({
    where: {
      partnerId: partner.id,
    },
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  });

  return await Promise.all(
    partnerUsers.map(({ user }) =>
      limiter.schedule(() =>
        sendEmailViaResend({
          subject: `You just made a sale via ${platform.company} Partners!`,
          from: `${platform.email.from.default}`,
          email: user.email!,
          react: NewSaleCreated({
            email: user.email!,
            program,
            partner,
            sale,
          }),
        }),
      ),
    ),
  );
}
