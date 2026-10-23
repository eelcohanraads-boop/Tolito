export type AvatarCategory = 'kids' | 'teens' | 'adults' | 'grandparents' | 'pets';

export const avatarCategories: {id: AvatarCategory;label: string;}[] = [
{ id: 'kids', label: 'Kids' },
{ id: 'teens', label: 'Teens' },
{ id: 'adults', label: 'Adults' },
{ id: 'grandparents', label: 'Grandparents' },
{ id: 'pets', label: 'Pets & fun' }];


const mint = { bg: '#D6EEDF', fg: '#3E8A5E' };
const sky = { bg: '#CDE7F3', fg: '#2F7AA3' };
const peach = { bg: '#FFDCC8', fg: '#B5532A' };
const butter = { bg: '#FCE9A9', fg: '#9A6A00' };
const pink = { bg: '#F9D3DC', fg: '#C24D73' };
const lavender = { bg: '#E3D9F5', fg: '#7653B8' };

const cdn = (id: string) => `https://cdn.magicpatterns.com/patterns/generated-images/${id}.jpg`;

/** Ready-made cartoon avatars in the same style as the family portraits */
export const avatarIllustrations: {url: string;label: string;category: AvatarCategory;bg: string;fg: string;}[] = [
// Kids
{ url: cdn('089c59f0-2aa7-43b6-b8cd-81141240d62b'), label: 'Girl with curly hair', category: 'kids', ...mint },
{ url: cdn('d2420ad9-60e5-446b-98c8-d6596bfdb6eb'), label: 'Boy with a cap', category: 'kids', ...peach },
{ url: cdn('1f8b9667-2ba5-4d57-b2f3-58d133eb7a95'), label: 'Girl with pigtails', category: 'kids', ...mint },
{ url: cdn('bffbabd2-8383-42d9-b1c0-8119af670f33'), label: 'Boy with curly hair', category: 'kids', ...sky },
{ url: cdn('67463690-2844-4bf6-a9a0-f61ab87b6559'), label: 'Girl with a braid', category: 'kids', ...peach },
{ url: cdn('72b61816-cb41-4e52-80c2-e5134dd6d032'), label: 'Boy with red hair', category: 'kids', ...butter },
{ url: cdn('7558993a-d2a6-40a7-a59c-d07c95aa6da2'), label: 'Girl with a headband', category: 'kids', ...pink },
{ url: cdn('b01173c0-9e3c-4887-adc4-8f8a7aff7016'), label: 'Boy in a hoodie', category: 'kids', ...lavender },
{ url: cdn('e896f27b-9454-49d9-95b0-c8f20d52cc5b'), label: 'Girl with afro puffs', category: 'kids', ...mint },
{ url: cdn('778b9fe2-7de1-42c5-bf2d-217c10a8bb1f'), label: 'Boy with glasses', category: 'kids', ...peach },
{ url: cdn('86dee3d2-dcb3-43eb-9a99-cc93cd6c86a3'), label: 'Cheerful kid', category: 'kids', ...butter },
{ url: cdn('2e866fa8-1040-41f4-88f7-80ef8d4c7d2b'), label: 'Toddler', category: 'kids', ...mint },
{ url: cdn('b7fef8b0-4b8d-48b3-81b4-89ce692795a0'), label: 'Baby', category: 'kids', ...sky },
// Teens
{ url: cdn('1ea9561a-b687-444d-89c4-e31bf95ab9e8'), label: 'Teen with headphones', category: 'teens', ...butter },
{ url: cdn('a9c9fd73-8c05-49b7-a516-525216a344f0'), label: 'Teen with box braids', category: 'teens', ...lavender },
{ url: cdn('668633db-11ad-4eef-af2e-6f6c039ee219'), label: 'Teen in a denim jacket', category: 'teens', ...mint },
{ url: cdn('3cfc0341-90e8-459c-9d61-e9781e42872d'), label: 'Teen with a hijab', category: 'teens', ...pink },
{ url: cdn('cec7cfa3-90ba-4bf6-b43a-d5b5e4da81d5'), label: 'Teen with braces', category: 'teens', ...sky },
{ url: cdn('69196a8e-dd20-49b5-b2a8-8acbdc793edb'), label: 'Teen with a beanie', category: 'teens', ...peach },
{ url: cdn('61a0b2b6-08f7-4a61-8239-b4706e93e89f'), label: 'Teen with teal hair', category: 'teens', ...butter },
{ url: cdn('619c983a-e783-44cf-a38c-8f5057f5fcd4'), label: 'Teen in a football shirt', category: 'teens', ...mint },
{ url: cdn('83ea5493-aa93-44c9-8e81-e8e3cddae1af'), label: 'Teen with a bob and glasses', category: 'teens', ...lavender },
// Adults
{ url: cdn('d0e10fe0-ba8b-4181-b023-63f74c6a0b78'), label: 'Woman with a ponytail', category: 'adults', ...pink },
{ url: cdn('128b6806-3233-45ca-881f-ad0664d64359'), label: 'Man with a beard', category: 'adults', ...sky },
{ url: cdn('7a00946f-e64b-4e2f-b7eb-c4c44533a8ee'), label: 'Man with a shaved head', category: 'adults', ...sky },
{ url: cdn('eb4de4c2-4474-4f8d-bfb1-c9843bc621cc'), label: 'Woman with long dark hair', category: 'adults', ...pink },
{ url: cdn('c2d8a9e7-aa68-4eac-8e39-6ac5b1a79e81'), label: 'Man with glasses', category: 'adults', ...butter },
{ url: cdn('1a6e4c2d-b272-4d2f-8432-393d7d76eddb'), label: 'Woman with a pixie cut', category: 'adults', ...mint },
{ url: cdn('1218f547-4ffe-4a31-b664-719c191321b0'), label: 'Man with a mustache', category: 'adults', ...peach },
{ url: cdn('66b88865-54ff-41b6-acd0-504f0d5b86c2'), label: 'Woman with an afro', category: 'adults', ...lavender },
{ url: cdn('eb57e958-742a-49db-9fa3-cdce6a6f4cd7'), label: 'Man with a full beard', category: 'adults', ...mint },
{ url: cdn('24505e48-0266-4c34-8e34-69235b948a0f'), label: 'Woman with a headscarf', category: 'adults', ...sky },
{ url: cdn('67143367-5b15-47da-9674-2987e05c0512'), label: 'Man with a hair bun', category: 'adults', ...butter },
{ url: cdn('fadcbfa8-63f3-47ae-90d6-81099ba309b7'), label: 'Woman with red curls', category: 'adults', ...pink },
{ url: cdn('21241558-c1d2-403c-92cc-10eeb4853d84'), label: 'Woman with a high bun', category: 'adults', ...peach },
{ url: cdn('b947173d-2554-4ccd-883a-0608c5071c40'), label: 'Man with long braids', category: 'adults', ...lavender },
// Grandparents
{ url: cdn('903cc9cb-2620-4a64-8c65-7a78c14e5331'), label: 'Grandma with glasses', category: 'grandparents', ...lavender },
{ url: cdn('d2d38d7a-68a9-48b4-b6ae-3020ab39e9fc'), label: 'Grandpa with a mustache', category: 'grandparents', ...sky },
{ url: cdn('c073b64a-494d-4b95-ba3e-041573255d5a'), label: 'Grandma with grey curls', category: 'grandparents', ...butter },
{ url: cdn('c6954c60-4a9f-41e0-8d1b-3d501ea9a73b'), label: 'Grandpa with a flat cap', category: 'grandparents', ...mint },
{ url: cdn('d4152bb2-4db9-40f5-a305-8d62001e821f'), label: 'Grandma with a silver braid', category: 'grandparents', ...pink },
{ url: cdn('d8393680-8bef-4a39-ac8b-10c81e190459'), label: 'Grandpa with a white beard', category: 'grandparents', ...peach },
{ url: cdn('56c14114-2cf3-4390-ad28-9a3e4ab4ed39'), label: 'Grandma with a bun', category: 'grandparents', ...lavender },
// Pets & fun
{ url: cdn('f017647c-db3b-40a2-bb79-6c73c3df2a94'), label: 'Family dog', category: 'pets', ...peach },
{ url: cdn('83cd547e-81ae-45e3-8ccf-77974df393aa'), label: 'Tabby cat', category: 'pets', ...butter },
{ url: cdn('50d2526d-dd89-482f-b1db-9133a3017faf'), label: 'Bunny', category: 'pets', ...pink },
{ url: cdn('7a38c8eb-48e5-4692-8bb0-5437058150f3'), label: 'Brownie', category: 'pets', ...peach },
{ url: cdn('484d1ae3-9597-404e-bdb5-08e4d7f1caa7'), label: 'Little dinosaur', category: 'pets', ...mint }];