/**
 * @description types store
 * @author 阿怪
 * @date 2024/1/6 04:40
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


export default defineStore('types', () => {

  const typesRef = ref<BlogTypeVO[]>([]);
  const colorTypeMapRef = ref(new Map<string, string>());

  const fetchTypes = async () => {
    const { data } = await useFetch<BlogType[]>('/api/type');
    if (data.value) {
      typesRef.value = data.value.map(e => ({ ...e, isActive: false }));
      data.value.forEach(type => {
        colorTypeMapRef.value.set(type.name, type.color);
      });
    }
  };


  const allUnActive = computed(() => {
    return !typesRef.value.some(e => e.isActive);
  });

  const getStyle = (typeItem: BlogTypeVO) => {
    if (allUnActive.value) {
      return {
        '--m-tag-bg': typeItem.color
      };
    }

    return {
      '--m-tag-bg': typeItem.isActive ? typeItem.color : 'var(--m-color-text-disabled)'
    };

  };

  const currentActiveTypeRef = ref<BlogTypeVO>();
  const currentActiveTypeNameRef = computed(() => {
    return currentActiveTypeRef.value?.name;
  });
  const onActiveType = (typeItem: BlogTypeVO) => {
    currentActiveTypeRef.value = undefined;
    typesRef.value.forEach(e => {
      if (e.id === typeItem.id) {
        e.isActive = !e.isActive;
        if (e.isActive) {
          currentActiveTypeRef.value = e;
        }
      } else {
        e.isActive = false;
      }
    });
  };

  return {
    typesRef,
    fetchTypes,
    colorTypeMapRef,
    currentActiveTypeRef,
    currentActiveTypeNameRef,
    getStyle,
    onActiveType
  };
});
