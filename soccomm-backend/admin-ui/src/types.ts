export type StoreType = {
  a: number;
};

export type PostCountForCategoryType = {
  catId: string;
  catName: string;
  countOfPosts: number;
};

export type PostsBriefInfoType = {
  postTitle: string;
  createdAt: string;
  username: string;
  postId: string;
};
export interface PostsInfoType extends PostsBriefInfoType {  
  description:string;  
};

export type QuarterType = {
  name: string;
  thisQuarterStartDate: string;
  nextQuarterStartDate: string;
};

export type UsersDetailsType = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: string;
};

export type MonthsArrayType = {
  fromDate: string;
  toDate: string;
};
