import { urlAuthorization } from './helpers/index';
import { CredentialsEntity } from './modules/entities/credentials.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import process from 'process';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(CredentialsEntity)
    private repository: Repository<CredentialsEntity>,
  ) {}

  async generateAccessCredentials(accessCode: string) {
    const { data } = await lastValueFrom(
      this.httpService.post(urlAuthorization, {
        grant_type: 'authorization_code',
        client_id: 5167 || process.env.CLIENT_ID,
        client_secret:
          'UEF1X9sb6yKeZBFBiwjrQXYCcHW79tyaWKjbadM7Cvi0uPkD' ||
          process.env.CLIENT_SECRET,
        code: accessCode,
      }),
    );

    const { access_token: token, user_id, error_description: error } = data;

    if (token && user_id) {
      const accessToken = this.repository.create({ user_id, token });
      this.repository.save(accessToken);
      return { user_id, token };
    }

    throw new BadRequestException(error);
  }
}