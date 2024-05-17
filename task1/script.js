// условие из задания nums1 === [1,2,2,3,5,6] никогда не вернет true даже при не строгом сравнении

function merge(nums1, m, nums2, n) {
  let lastIndex = m + n - 1;
  let firstLength = m - 1;
  let secondLength = n - 1;
  while (secondLength >= 0) {
    if (firstLength >= 0 && nums1[firstLength] > nums2[secondLength]) {
      nums1[lastIndex--] = nums1[firstLength--];
    } else {
      nums1[lastIndex--] = nums2[secondLength--];
    }
  }
  return;
}
