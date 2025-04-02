import { Prisma, PrismaClient } from "@prisma/client";

class Database {
  private prisma = new PrismaClient();

  async getMember(memberId: string, serverId: string, withLogs = false) {
    return this.prisma.member.findFirstOrThrow({
      include: {
        createdLogs: withLogs,
      },
      where: {
        id: memberId,
        serverId: serverId,
      },
    });
  }

  async getLog(
    id: string,
    serverId: string,
  ): Promise<
    Prisma.LogGetPayload<{
      include: { messages: { include: { reactions: true; member: true } } };
    }>
  > {
    return this.prisma.log.findFirstOrThrow({
      include: {
        messages: {
          include: {
            reactions: true,
            member: true,
          },
        },
      },
      where: {
        id: id,
        serverId: serverId,
      },
    });
  }

  async getLogs(
    serverId: string,
    take?: number,
    cursor?: string,
  ): Promise<Prisma.LogGetPayload<{}>[]> {
    return this.prisma.log.findMany({
      skip: cursor === undefined ? 0 : 1,
      take,
      cursor: cursor
        ? {
            id: cursor,
          }
        : undefined,
      where: {
        serverId: serverId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getServer(id: string) {
    return this.prisma.server.findFirstOrThrow({
      include: {
        members: true,
        logs: true,
      },
      where: {
        id: id,
      },
    });
  }
}

export default new Database();
