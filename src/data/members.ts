import type { Member } from '../types/chores';

export const householdName = 'The de Vries home';

export const currentUserId = 'sanne';

export const mascotImages = {
  hello: "/52714275-3423-4447-8aa5-3184f6aaa8a8.jpg",
  relaxing: "/84908b39-8b1e-4761-ae95-8fcfabfd2fa2.jpg"
};

export const members: Member[] = [
{
  id: 'sanne',
  name: 'Sanne',
  role: 'admin',
  bg: '#F9D3DC',
  fg: '#D9668A',
  avatarUrl: "/94eff80b-9318-43f2-b41c-81139d31f634.jpg",
  email: 'sanne@devries.nl',
  provider: 'password',
  weekDone: 9,
  pointsGoal: 120,
  periodEarned: 85,
  banked: 40
},
{
  id: 'mark',
  name: 'Mark',
  role: 'admin',
  bg: '#CDE7F3',
  fg: '#4F9CC4',
  avatarUrl: "/c1333e19-2336-409f-8f8e-0c5c0e0c4dce.jpg",
  email: 'mark.devries@gmail.com',
  provider: 'google',
  weekDone: 6,
  pointsGoal: 120,
  periodEarned: 70,
  banked: 15
},
{
  id: 'emma',
  name: 'Emma',
  role: 'contributor',
  bg: '#E3D9F5',
  fg: '#9575CD',
  avatarUrl: "/68980427-f9f6-4527-9107-3df26151818c.jpg",
  email: 'emma.devries@icloud.com',
  provider: 'apple',
  weekDone: 7,
  pointsGoal: 60,
  periodEarned: 72,
  banked: 95
},
{
  id: 'daan',
  name: 'Daan',
  role: 'contributor',
  bg: '#FCE9A9',
  fg: '#E2A72E',
  avatarUrl: "/1f95f7ef-aba6-4a35-9c27-3f9d58051eb9.jpg",
  email: 'daan@devries.nl',
  provider: 'password',
  weekDone: 4,
  pointsGoal: 40,
  periodEarned: 25,
  banked: 50
}];