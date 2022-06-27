import api from ".";

enum RE { // Report Endpoints
  Dpp = "dpplist",
  Aic = "aiclist",
  Santral = "santral",
  DppOrganizations = "organizations",
  InjectionUnit = "injectionunit",
}

const apiReportEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getDpp: builder.query<CapacityValues[], DateIntervalEicParams>({
      query: (q) => {
        return {
          url: `${RE.Dpp}?startDate=${q.startDate}&endDate=${q.endDate}&uevcbEIC=${q.uevcbEIC}`,
        };
      },
    }),
    getAic: builder.query<CapacityValues[], DateIntervalEicParams>({
      query: (q) => {
        return {
          url: `${RE.Aic}?startDate=${q.startDate}&endDate=${q.endDate}&uevcbEIC=${q.uevcbEIC}`,
        };
      },
    }),
    getSantral: builder.query<SantralResponse, DateIntervalEicParams>({
      query: (q) => {
        return {
          url: `${RE.Santral}?startDate=${q.startDate}&endDate=${q.endDate}&uevcbEIC=${q.uevcbEIC}`,
        };
      },
    }),
    getDppOrganizations: builder.query<DppOrganization[], void>({
      query: () => ({
        url: `${RE.DppOrganizations}`,
      }),
    }),
    getInjectionUnit: builder.query<InjectionUnit[], void>({
      query: () => ({
        url: `${RE.InjectionUnit}`,
      }),
    }),
  }),
});

export const {
  useLazyGetDppQuery: useLazyGetDpp,
  useLazyGetAicQuery: useLazyGetAic,
  useLazyGetSantralQuery: useLazyGetSantral,
  useGetDppOrganizationsQuery: useGetDppOrganizations,
  useGetInjectionUnitQuery: useGetInjectionUnit,
} = apiReportEndpoints;

export default apiReportEndpoints;
