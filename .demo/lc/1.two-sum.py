#
# @lc app=leetcode id=1 lang=python3
#
# [1] Two Sum
#
class Solution:
    # Brute Force
    def twoSum0(self, nums: List[int], target: int) -> List[int]:
        for i in range(len(nums)):
            for j in range(i+1, len(nums)):
                if nums[i] + nums[j] == target:
                    return [i, j]
    # One-pass Hash Table
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        dict = {}
        for i in range(len(nums)):
            if nums[i] in dict:
                return [dict.get(nums[i]), i]
            else:
                dict[target - nums[i]] = i

