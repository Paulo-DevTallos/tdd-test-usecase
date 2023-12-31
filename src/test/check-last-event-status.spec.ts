import { set, reset } from "mockdate";

interface EventStatus {
  status: string;
}

// use case principal que injeta a interface de abstração
class CheckLastEventStatus {
  constructor(
    private readonly loadLastEventRepository: LoadLastEventRepository,
  ) {}

  async perform({ groupId }: { groupId: string }): Promise<EventStatus> {
    const event = await this.loadLastEventRepository.loadLastEvent({ groupId });

    if (event === undefined) return { status: "done" };

    const now = new Date();
    return event.endDate >= now ? { status: "active" } : { status: "inReview" };
  }
}

// abstração para inversão de dependencias
interface LoadLastEventRepository {
  loadLastEvent: (groupId: {
    groupId: string;
  }) => Promise<{ endDate: Date } | undefined>;
}

// repositpry que implementa a interface de abstração
class LoadLastEventRepositorySpy implements LoadLastEventRepository {
  groupId?: string;
  callsCount = 0;
  output?: { endDate: Date };

  async loadLastEvent({
    groupId,
  }: {
    groupId: string;
  }): Promise<{ endDate: Date } | undefined> {
    this.groupId = groupId;
    this.callsCount++;
    return this.output;
  }
}

interface SutTypes {
  sut: CheckLastEventStatus;
  loadLastEventRepository: LoadLastEventRepositorySpy;
}

const makeSut = (): SutTypes => {
  const loadLastEventRepository = new LoadLastEventRepositorySpy();
  const sut = new CheckLastEventStatus(loadLastEventRepository);

  return {
    sut,
    loadLastEventRepository,
  };
};

describe("CheckLastEventStatus", () => {
  const groupId = "any_group_id";

  beforeAll(() => set(new Date()));
  afterAll(() => reset());

  it("Should get last event data", async () => {
    const { sut, loadLastEventRepository } = makeSut();

    await sut.perform({ groupId });

    expect(loadLastEventRepository.groupId).toBe(groupId);
    expect(loadLastEventRepository.callsCount).toBe(1);
  });

  it("Should return status done when group has no event", async () => {
    const { sut, loadLastEventRepository } = makeSut();
    loadLastEventRepository.output = undefined;

    const eventStatus = await sut.perform({ groupId });

    expect(eventStatus.status).toBe("done");
    expect(loadLastEventRepository.callsCount).toBe(1);
  });

  it("Should return status active when group now is before event end time", async () => {
    const { sut, loadLastEventRepository } = makeSut();
    loadLastEventRepository.output = {
      endDate: new Date(new Date().getTime() + 1), // cria uma data a partir de uma outra data um pouco maior que essa data
    };

    const eventStatus = await sut.perform({ groupId });

    expect(eventStatus.status).toBe("active");
  });

  it("Should return status active when group now is equal event end time", async () => {
    const { sut, loadLastEventRepository } = makeSut();
    loadLastEventRepository.output = {
      endDate: new Date(new Date().getTime()),
    };

    const eventStatus = await sut.perform({ groupId });

    expect(eventStatus.status).toBe("active");
  });

  it("Should return status inReview when group now is after event end time", async () => {
    const { sut, loadLastEventRepository } = makeSut();
    loadLastEventRepository.output = {
      endDate: new Date(new Date().getTime() - 1), // cria uma data a partir de uma outra data um pouco maior que essa data
    };

    const eventStatus = await sut.perform({ groupId });

    expect(eventStatus.status).toBe("inReview");
  });

  it("Should return status inReview when group now is before review time", async () => {
    const { sut, loadLastEventRepository } = makeSut();
    loadLastEventRepository.output = {
      endDate: new Date(new Date().getTime() - 1), // cria uma data a partir de uma outra data um pouco maior que essa data
    };

    const eventStatus = await sut.perform({ groupId });

    expect(eventStatus.status).toBe("inReview");
  });
});
