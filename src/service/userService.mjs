import sql from '../database.mjs';

export async function updateUserSubscription(id, days) {
  try {
    const newSubscription = await sql`UPDATE users SET subscribe_days = ${days} WHERE id = ${id} RETURNING *`;

    return JSON.stringify(newSubscription);
  } catch (err) {
    console.error(err);
    return null;
  }
};

export async function getUser(id) {
  try {
    const [user] = await sql`SELECT * FROM users WHERE id = ${id}`;

    return user;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export async function getUserSubscribeDays(id) {
  try {
    const [{ subscribe_days }] = await sql`SELECT subscribe_days FROM users WHERE id = ${id}`;

    return Number(subscribe_days);
  } catch (err) {
    console.error(err);
    return 0;
  }
};

export async function decrementUsersSubscriptionDays() {
  try {
    console.log('Updating users subscription days...');
    const users = await sql`SELECT * FROM users`;

    for (const user of users) {
      const subscriptionDaysNumber = await getUserSubscribeDays(user.id);

      if (!isNaN(subscriptionDaysNumber)) {
        const newDays = subscriptionDaysNumber === 0 ? 0 : subscriptionDaysNumber - 1;
        await updateUserSubscription(user.id, newDays);
      }
    }
  } catch (err) {
    console.error(err);
  }
};
