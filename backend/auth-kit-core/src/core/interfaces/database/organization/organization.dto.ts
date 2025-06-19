export type CreateOrganizationDto = {
  name: string;
  slug: string;
};

export type UpdateOrganizationDto = {
  name?: string;
  slug?: string;
};
