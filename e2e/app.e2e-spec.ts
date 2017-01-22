import { ProjectHubPage } from './app.po';

describe('project-hub App', function() {
  let page: ProjectHubPage;

  beforeEach(() => {
    page = new ProjectHubPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
