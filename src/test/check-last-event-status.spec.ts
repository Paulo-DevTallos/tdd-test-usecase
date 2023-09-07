// use case
class CheckLastEventStatus {
  constructor(
    private readonly loadLastEventRepository: LoadLastEventRepository,
  ) {}

  async perform(groupId: string): Promise<void> {
    console.log(groupId);
    this.loadLastEventRepository.groupId = groupId;
  }
}

class LoadLastEventRepository {
  groupId?: string;
}

describe("CheckLastEventStatus", () => {
  it("Should get last event data", async () => {
    const loadLastEventRepository = new LoadLastEventRepository();
    const checkLastEventStatus = new CheckLastEventStatus(
      loadLastEventRepository,
    );

    await checkLastEventStatus.perform("any_group_id");

    expect(loadLastEventRepository.groupId).toBe("any_group_id");
  });
});
