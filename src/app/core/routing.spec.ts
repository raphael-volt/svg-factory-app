import { appRoutes } from './routing.module';

describe('core', () => {
  describe('routing', () => {
    it('should get routes', () => {
      expect(appRoutes.length).toBeGreaterThan(1)
    })
  })
  describe('more', () => {
    it('should be truthy', () => {
      expect(true).toBeTruthy()
    })
    it('should be falsy', () => {
      expect(false).toBeFalsy()
    })
  })
  
});
