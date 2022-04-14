import { render, screen } from '@testing-library/vue';
import Card from '@/components/Card/index.vue'

describe('show card', () => {
  test('should show card info when render component', () => {
    render(Card, {
      props: {
        item: {
          name: 'Nuuk',
          sys: {
              country: 'GL',
          },
          main: {
              temp: 3.66,
              pressure: 1005,
              humidity: 97
          },
          id: 3421319,
          updated: '2022-04-14T02:21:13.015Z',
          color: 'blue'
        },
        loading: false,
      },
    });
    const nameCitie = screen.getByText(/nuuk, gl/i);
    const temperature = screen.getByText(/4/i)
    const humidity = screen.getByText(/97/i);
    const pressure = screen.getByText(/1005/i)
    const updated = screen.getByText(/updated at 11:21:13 pm/i)
    expect(nameCitie).toBeTruthy();
    expect(temperature).toBeTruthy();
    expect(humidity).toBeTruthy();
    expect(pressure).toBeTruthy();
    expect(updated).toBeTruthy();
  });
})