export const getTimeBracket = (date: Date): 'today' | 'yesterday' | 'week' | 'month' | 'jan' | 'feb' | 'mar' | 'apr' | 'may' | 'jun' | 'jul' | 'aug' | 'sep' | 'okt' | 'nov' | 'dec' | 'year' => {
  const now = new Date();
  const secondsInYear = 60 * 60 * 24 * 365;

  if(now.getDate() === date.getDate() && now.getMonth() === date.getMonth() && now.getFullYear() === date.getFullYear()) return 'today';
  if(now.getDate() - date.getDate() === 1 && now.getMonth() === date.getMonth() && now.getFullYear() === date.getFullYear()) return 'yesterday';
  if(now.getDate() - date.getDate() < 7 && now.getMonth() === date.getMonth() && now.getFullYear() === date.getFullYear()) return 'week';
  if(now.getMonth() === date.getMonth() && now.getFullYear() === date.getFullYear()) return 'month';
  if((now.getTime() / 1000 - date.getTime() / 1000) > secondsInYear) return 'year';
  if(date.getMonth() === 0) return 'jan';
  if(date.getMonth() === 1) return 'feb';
  if(date.getMonth() === 2) return 'mar';
  if(date.getMonth() === 3) return 'apr';
  if(date.getMonth() === 4) return 'may';
  if(date.getMonth() === 5) return 'jun';
  if(date.getMonth() === 6) return 'jul';
  if(date.getMonth() === 7) return 'aug';
  if(date.getMonth() === 8) return 'sep';
  if(date.getMonth() === 9) return 'okt';
  if(date.getMonth() === 10) return 'nov';
  if(date.getMonth() === 11) return 'dec';
  return 'today';
};