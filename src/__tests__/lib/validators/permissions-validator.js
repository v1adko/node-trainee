import permissionsValidator from '../../../lib/validators/permissions-validator';
import permissions from '../../../constants/permissions';

const request = {
  user: {
    role: permissions.USER.value
  }
};

describe('Test permissions validator', async () => {
  it('should check permissions, nothing to do and give pass to next methods', async () => {
    permissionsValidator(permissions.USER, request);
  });

  it('should return PermissionsError, because permissions does not enough', async () => {
    const exceedAccess = () => permissionsValidator(permissions.ADMIN, request);

    expect(exceedAccess).toThrowErrorMatchingSnapshot();
  });

  it('should return PermissionsError, because request does not have permissions', async () => {
    const exceedAccess = () => permissionsValidator(permissions.ADMIN, {});

    expect(exceedAccess).toThrowErrorMatchingSnapshot();
  });

  it('should pass all methods, because permission level does not specified', async () => {
    permissionsValidator({}, request);
  });
});
