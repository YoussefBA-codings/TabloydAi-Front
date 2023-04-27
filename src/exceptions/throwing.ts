import {
  BadRequestException,
  ForbiddenException,
  InternalServerException,
  NotFoundException,
  UnauthorizedException
} from '@SRC/exceptions';

export const exceptionThrower = (error: any) => {
  const errorMessage = error.response.data.message;
  if (error.response) {
    switch (error.response.status) {
      case 400:
        throw new BadRequestException(errorMessage);
      case 401:
        throw new UnauthorizedException(errorMessage);
      case 403:
        throw new ForbiddenException(errorMessage);
      case 404:
        throw new NotFoundException(errorMessage);

      case 500:
        throw new InternalServerException(errorMessage);
    }
  } else throw new InternalServerException(error);
};
