const webKey = "test"; // 'test' - 测试 | 'prod' - 生产

const web = {
  test: {
    env: "test-4gfy7opt68ff5ac9",
  },
  prod: {
    env: "prod-6g2xhpegd2f45d94",
  },
};

export default web[webKey];
