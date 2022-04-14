import { mount, flushPromises } from '@vue/test-utils';
import Climates from '@/components/Climates/index.vue';
import axios from '@/services/api';

jest.mock('@/services/api');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mock = {
  data: {
    list: [
      {
          name: 'test Nuuk',
          sys: {
              country: 'GL',
          },
          main: {
              temp: -3.66,
              pressure: 1005,
              humidity: 100
          },
          id: 3421319,
          updated: '2022-04-14T01:31:13.508Z',
          color: 'blue'
      },
      {
          name: 'Urubici',
          sys: {
              country: 'BR',
          },
          main: {
              temp: 15.18,
              pressure: 1015,
              humidity: 99
          },
          id: 3445709,
          updated: '2022-04-14T01:31:13.508Z',
          color: 'orange'
      },
      {
          name: 'Nairobi',
          sys: {
              country: 'KE',
          },
          main: {
              temp: 27.62,
              pressure: 1022,
              humidity: 94
          },
          id: 184745,
          updated: '2022-04-14T01:31:13.508Z',
          color: 'orange'
      }
    ]
  }
}

const dateNow = new Date();

const mockDateNow = {
  data: {
    list: [
      {
          name: 'test Nuuk 2',
          sys: {
              country: 'GL',
          },
          main: {
              temp: -3.66,
              pressure: 1005,
              humidity: 100
          },
          id: 3421319,
          updated: dateNow,
          color: 'blue'
      },
      {
          name: 'Urubici',
          sys: {
              country: 'BR',
          },
          main: {
              temp: 15.18,
              pressure: 1015,
              humidity: 99
          },
          id: 3445709,
          updated: dateNow,
          color: 'orange'
      },
      {
          name: 'Nairobi',
          sys: {
              country: 'KE',
          },
          main: {
              temp: 27.62,
              pressure: 1022,
              humidity: 94
          },
          id: 184745,
          updated: dateNow,
          color: 'orange'
      }
    ]
  }
}

const climates = '[{"name":"Nuuk","sys":{"country":"GL","timezone":-7200,"sunrise":1649923094,"sunset":1649976939},"main":{"temp":-3.66,"feels_like":-10.66,"temp_min":-4.51,"temp_max":-3.66,"pressure":1005,"humidity":100},"id":3421319,"updated":"2022-04-14T03:11:13.115Z","color":"blue"},{"name":"Urubici","sys":{"country":"BR","timezone":-10800,"sunrise":1649928894,"sunset":1649970117},"main":{"temp":15.18,"feels_like":15.34,"temp_min":15.18,"temp_max":15.18,"pressure":1015,"sea_level":1015,"grnd_level":911,"humidity":99},"id":3445709,"updated":"2022-04-14T03:11:13.115Z","color":"orange"},{"name":"Nairobi","sys":{"country":"KE","timezone":10800,"sunrise":1649907020,"sunset":1649950522},"main":{"temp":17.62,"feels_like":17.89,"temp_min":17.62,"temp_max":18.87,"pressure":1022,"humidity":94},"id":184745,"updated":"2022-04-14T03:11:13.115Z","color":"orange"}]'

jest.useFakeTimers();

describe('show list', () => {
  test('should get data when call component', async () => {
    mockedAxios.get.mockResolvedValueOnce(mock);
    const component = mount(Climates);
    await flushPromises();
    expect(component.vm.data[0].name).toEqual('test Nuuk');
  });
  test('should set local storage data when request', async () => {
    localStorage.setItem("climates", climates);
    mockedAxios.get.mockResolvedValueOnce(mockDateNow);
    const component = mount(Climates);
    await flushPromises();
    expect(component.vm.data[0].name).toEqual('test Nuuk 2');
  });
  test('should get data when 10 minutes have passed', () => {
    mockedAxios.get.mockResolvedValueOnce(mockDateNow);
    const component = mount(Climates);
    jest.advanceTimersByTime(700000);
    expect(new Date(component.vm.data[0].updated)).toEqual(dateNow);
  });
})