// user.dto.ts
/**
 * Data transfer objects (DTOs) for creating and updating users.
 */
export class CreateUserDto {
    username: string;
    password: string;
    role: string;
  }
  
  export class UpdateUserDto {
    username?: string;
    password?: string;
    role?: string;
  }
  