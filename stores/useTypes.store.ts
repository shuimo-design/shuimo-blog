/**
 * @description types store
 * @author 阿怪
 * @date 2024/1/6 04:40
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


export default defineStore('types', () => {

  const typesRef = ref<BlogType[]>([]);
  const colorTypeMapRef = ref(new Map<string, string>());

  const fetchTypes = async () => {
    const { data } = await useFetch<BlogType[]>('/api/type');
    if (data.value) {
      typesRef.value = data.value;
      data.value.forEach(type => {
        colorTypeMapRef.value.set(type.name, type.color);
      });
    }
  };

  return {
    typesRef,
    fetchTypes,
    colorTypeMapRef
  };
});
