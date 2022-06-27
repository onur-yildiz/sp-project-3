interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  firstName: string;
  lastName: string;
}

interface UserUpdateParams<T> {
  userId: string;
  body: T;
}

interface DeleteApiKeyBody {
  apiKey: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
}

interface ApiKey {
  userId: string;
  appName: string;
  key: string;
}

interface DateInterval {
  startDate: string;
  endDate: string;
}

interface DateIntervalPeriodic extends DateInterval {
  period: string;
}

interface DateIntervalEicParams extends DateInterval {
  uevcbEIC: string;
}

interface UpdateRolesBody {
  roles: string[];
}

interface UpdateIsActiveBody {
  isActive: boolean;
}

interface CapacityValues {
  tarih: string;
  toplam: number;
  dogalgaz: number;
  ruzgar: number;
  linyit: number;
  tasKomur: number;
  ithalKomur: number;
  fuelOil: number;
  jeotermal: number;
  barajli: number;
  nafta: number;
  biokutle: number;
  akarsu: number;
  diger: number;
}

interface SantralResponse {
  id: number;
  unitId: string;
  eic: string;
  unitName: string;
  organizationETSOCode: string;
  santralTipi: number;
  valueList: {
    Eak: [
      {
        tarih: string;
        toplam: number;
      }
    ];
    Kgup: [
      {
        tarih: string;
        toplam: number;
      }
    ];
  };
}

interface InjectionUnit {
  id: number;
  unitId: string;
  name: string;
  eic: string;
  organizationETSOCode: string;
}

interface DppOrganization {
  id: number;
  organizationId: number;
  organizationName: string;
  organizationShortName: string;
  organizationStatus: string;
  organizationETSOCode: string;
}
